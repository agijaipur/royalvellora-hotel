import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { X, Maximize2, Minimize2, Play, Pause, RotateCcw, Move, Bed, Bath, Building2, Sun, Sofa, UtensilsCrossed, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "./button";
import { PanoramaScene } from "@/data/rooms";

interface Viewer360Props {
  isOpen: boolean;
  onClose: () => void;
  scenes: PanoramaScene[];
  roomName: string;
}

const sceneIcons = {
  bedroom: Bed,
  bathroom: Bath,
  lobby: Building2,
  balcony: Sun,
  living: Sofa,
  dining: UtensilsCrossed,
};

// Wide-angle FOV settings for spacious feel
const FOV_CONFIG = {
  default: 100,      // Wide angle for spacious feel
  min: 50,           // Max zoom in
  max: 120,          // Max wide angle (ultra-wide)
  mobile: 95,        // Slightly narrower for mobile
};

export const Viewer360 = ({ isOpen, onClose, scenes, roomName }: Viewer360Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animationRef = useRef<number>(0);
  
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentFov, setCurrentFov] = useState(FOV_CONFIG.default);

  // Camera control state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const lon = useRef(0);
  const lat = useRef(0);
  const phi = useRef(0);
  const theta = useRef(0);
  const touchStartDistance = useRef(0);
  const targetLon = useRef(0);
  const targetLat = useRef(0);
  const targetFov = useRef(FOV_CONFIG.default);

  const activeScene = scenes[activeSceneIndex];

  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const loadScene = useCallback((scene: PanoramaScene) => {
    if (!sceneRef.current || !meshRef.current) return;

    setIsLoading(true);
    setIsTransitioning(true);

    // Clean up previous video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
      videoRef.current = null;
    }

    // Larger sphere for better quality and less distortion
    const geometry = new THREE.SphereGeometry(1000, 100, 60);
    geometry.scale(-1, 1, 1);

    if (scene.type === "image") {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        scene.url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.generateMipmaps = false;
          
          const material = new THREE.MeshBasicMaterial({ 
            map: texture,
            side: THREE.BackSide 
          });
          
          if (meshRef.current) {
            if (meshRef.current.material instanceof THREE.Material) {
              meshRef.current.material.dispose();
            }
            if (meshRef.current.geometry) {
              meshRef.current.geometry.dispose();
            }
            meshRef.current.material = material;
            meshRef.current.geometry = geometry;
          }
          
          setIsLoading(false);
          setTimeout(() => setIsTransitioning(false), 300);
        },
        undefined,
        (error) => {
          console.error("Error loading texture:", error);
          setIsLoading(false);
          setIsTransitioning(false);
        }
      );
    } else if (scene.type === "video") {
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.playsInline = true;
      video.loop = true;
      video.muted = false;
      video.src = scene.url;
      video.load();
      videoRef.current = video;

      video.onloadeddata = () => {
        const texture = new THREE.VideoTexture(video);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        const material = new THREE.MeshBasicMaterial({ 
          map: texture,
          side: THREE.BackSide 
        });
        
        if (meshRef.current) {
          meshRef.current.material = material;
          meshRef.current.geometry = geometry;
        }
        
        setIsLoading(false);
        setTimeout(() => setIsTransitioning(false), 300);
        video.play();
      };
    }

    // Reset camera position for new scene with wide angle
    lon.current = 0;
    lat.current = 0;
    targetLon.current = 0;
    targetLat.current = 0;
    const defaultFov = isMobile ? FOV_CONFIG.mobile : FOV_CONFIG.default;
    targetFov.current = defaultFov;
    setCurrentFov(defaultFov);
    
    if (cameraRef.current) {
      cameraRef.current.fov = defaultFov;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isOpen || !containerRef.current || scenes.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera setup with wide FOV for spacious feel
    const defaultFov = isMobile ? FOV_CONFIG.mobile : FOV_CONFIG.default;
    const camera = new THREE.PerspectiveCamera(defaultFov, width / height, 0.1, 2000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;
    targetFov.current = defaultFov;
    setCurrentFov(defaultFov);

    // High-quality renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create initial mesh placeholder with larger sphere
    const geometry = new THREE.SphereGeometry(1000, 100, 60);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x1a1a1a, side: THREE.BackSide });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Load initial scene
    loadScene(scenes[activeSceneIndex]);

    // Smooth animation loop with interpolation
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Smooth auto-rotation
      if (autoRotate && !isDragging.current) {
        targetLon.current += 0.02;
      }

      // Smooth interpolation for camera movement (lerp)
      const lerpFactor = 0.08;
      lon.current += (targetLon.current - lon.current) * lerpFactor;
      lat.current += (targetLat.current - lat.current) * lerpFactor;

      // Smooth FOV interpolation
      if (camera.fov !== targetFov.current) {
        camera.fov += (targetFov.current - camera.fov) * lerpFactor;
        camera.updateProjectionMatrix();
      }

      // Clamp latitude
      lat.current = Math.max(-85, Math.min(85, lat.current));
      targetLat.current = Math.max(-85, Math.min(85, targetLat.current));
      
      phi.current = THREE.MathUtils.degToRad(90 - lat.current);
      theta.current = THREE.MathUtils.degToRad(lon.current);

      const x = 1000 * Math.sin(phi.current) * Math.cos(theta.current);
      const y = 1000 * Math.cos(phi.current);
      const z = 1000 * Math.sin(phi.current) * Math.sin(theta.current);

      camera.lookAt(x, y, z);
      renderer.render(scene, camera);
    };

    animate();

    // Smoother event handlers with velocity
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      
      // Sensitivity scales with FOV for consistent feel
      const sensitivity = (camera.fov / 100) * 0.12;
      targetLon.current -= deltaX * sensitivity;
      targetLat.current += deltaY * sensitivity;
      
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        touchStartDistance.current = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && isDragging.current) {
        const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.current.y;
        
        const sensitivity = (camera.fov / 100) * 0.15;
        targetLon.current -= deltaX * sensitivity;
        targetLat.current += deltaY * sensitivity;
        
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = touchStartDistance.current - distance;
        targetFov.current = Math.max(FOV_CONFIG.min, Math.min(FOV_CONFIG.max, targetFov.current + delta * 0.08));
        setCurrentFov(targetFov.current);
        touchStartDistance.current = distance;
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetFov.current = Math.max(FOV_CONFIG.min, Math.min(FOV_CONFIG.max, targetFov.current + e.deltaY * 0.04));
      setCurrentFov(targetFov.current);
    };

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    // Add event listeners
    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("mouseleave", handleMouseUp);
    renderer.domElement.addEventListener("touchstart", handleTouchStart, { passive: false });
    renderer.domElement.addEventListener("touchmove", handleTouchMove, { passive: false });
    renderer.domElement.addEventListener("touchend", handleTouchEnd);
    renderer.domElement.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("mouseleave", handleMouseUp);
      renderer.domElement.removeEventListener("touchstart", handleTouchStart);
      renderer.domElement.removeEventListener("touchmove", handleTouchMove);
      renderer.domElement.removeEventListener("touchend", handleTouchEnd);
      renderer.domElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current = null;
      }
      
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen, scenes, loadScene, activeSceneIndex, autoRotate, isMobile]);

  // Handle scene change
  useEffect(() => {
    if (isOpen && sceneRef.current && meshRef.current && scenes[activeSceneIndex]) {
      loadScene(scenes[activeSceneIndex]);
    }
  }, [activeSceneIndex, isOpen, loadScene, scenes]);

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    } catch (err) {
      console.log("Fullscreen error:", err);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const resetView = () => {
    targetLon.current = 0;
    targetLat.current = 0;
    const defaultFov = isMobile ? FOV_CONFIG.mobile : FOV_CONFIG.default;
    targetFov.current = defaultFov;
    setCurrentFov(defaultFov);
  };

  const zoomIn = () => {
    targetFov.current = Math.max(FOV_CONFIG.min, targetFov.current - 10);
    setCurrentFov(targetFov.current);
  };

  const zoomOut = () => {
    targetFov.current = Math.min(FOV_CONFIG.max, targetFov.current + 10);
    setCurrentFov(targetFov.current);
  };

  const handleSceneChange = (index: number) => {
    if (index !== activeSceneIndex) {
      setActiveSceneIndex(index);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black animate-in fade-in duration-300">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
            <Move className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-white font-display font-medium text-sm sm:text-base">{roomName}</h3>
            <p className="text-white/60 text-xs sm:text-sm">
              {activeScene?.name} • 360° Virtual Tour
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
            title="Zoom out (wider view)"
          >
            <ZoomOut className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAutoRotate(!autoRotate)}
            className="text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex"
            title={autoRotate ? "Stop auto-rotate" : "Start auto-rotate"}
          >
            <RotateCcw className={`w-4 h-4 sm:w-5 sm:h-5 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
          </Button>
          
          {activeScene?.type === "video" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={resetView}
            className="text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
            title="Reset view"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10 w-8 h-8 sm:w-10 sm:h-10"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>

      {/* Scene Switcher - Side Panel (Desktop) */}
      {scenes.length > 1 && (
        <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 hidden sm:flex flex-col gap-2">
          {scenes.map((scene, index) => {
            const IconComponent = scene.icon ? sceneIcons[scene.icon] : Move;
            const isActive = index === activeSceneIndex;
            
            return (
              <button
                key={scene.id}
                onClick={() => handleSceneChange(index)}
                className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                    : "bg-black/50 text-white/80 hover:bg-white/20 backdrop-blur-sm"
                }`}
                title={scene.name}
              >
                <IconComponent className="w-5 h-5" />
                <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive ? "opacity-100 max-w-32" : "opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-32"
                }`}>
                  {scene.name}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 360° Viewer Container */}
      <div 
        ref={containerRef} 
        className={`w-full h-full cursor-grab active:cursor-grabbing transition-opacity duration-300 ${
          isTransitioning ? "opacity-50" : "opacity-100"
        }`}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/90 pointer-events-none">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-2 border-4 border-transparent border-t-primary/50 rounded-full animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }} />
            </div>
            <p className="text-white/80 font-medium">Loading {activeScene?.name}...</p>
            <p className="text-white/50 text-sm mt-1">Preparing immersive 360° view</p>
          </div>
        </div>
      )}

      {/* FOV Indicator */}
      <div className="absolute top-20 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg hidden sm:block">
        <p className="text-white/70 text-xs">
          FOV: {Math.round(currentFov)}° {currentFov > 100 ? "(Ultra Wide)" : currentFov > 80 ? "(Wide)" : "(Normal)"}
        </p>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-2 sm:py-3 bg-black/70 backdrop-blur-md rounded-full border border-white/10">
        <p className="text-white/90 text-xs sm:text-sm flex items-center gap-2 sm:gap-3">
          <Move className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          <span className="hidden sm:inline">Drag to explore • Scroll to zoom • Click scenes to switch</span>
          <span className="sm:hidden">Drag to explore • Pinch to zoom</span>
        </p>
      </div>

      {/* Scene indicator dots (mobile) */}
      {scenes.length > 1 && (
        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
          {scenes.map((scene, index) => {
            const IconComponent = scene.icon ? sceneIcons[scene.icon] : Move;
            const isActive = index === activeSceneIndex;
            
            return (
              <button
                key={index}
                onClick={() => handleSceneChange(index)}
                className={`p-2 rounded-full transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-black/50 text-white/60 backdrop-blur-sm"
                }`}
              >
                <IconComponent className="w-4 h-4" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};