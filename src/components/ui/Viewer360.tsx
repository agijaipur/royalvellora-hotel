import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { X, Maximize2, Minimize2, Play, Pause, RotateCcw, Move, Bed, Bath, Building2, Sun, Sofa, UtensilsCrossed } from "lucide-react";
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

  // Camera control state
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const lon = useRef(0);
  const lat = useRef(0);
  const phi = useRef(0);
  const theta = useRef(0);
  const touchStartDistance = useRef(0);
  const initialFov = useRef(75);

  const activeScene = scenes[activeSceneIndex];

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

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    if (scene.type === "image") {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        scene.url,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          const material = new THREE.MeshBasicMaterial({ map: texture });
          
          if (meshRef.current) {
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
        const material = new THREE.MeshBasicMaterial({ map: texture });
        
        if (meshRef.current) {
          meshRef.current.material = material;
          meshRef.current.geometry = geometry;
        }
        
        setIsLoading(false);
        setTimeout(() => setIsTransitioning(false), 300);
        video.play();
      };
    }

    // Reset camera position for new scene
    lon.current = 0;
    lat.current = 0;
    if (cameraRef.current) {
      cameraRef.current.fov = initialFov.current;
      cameraRef.current.updateProjectionMatrix();
    }
  }, []);

  useEffect(() => {
    if (!isOpen || !containerRef.current || scenes.length === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    cameraRef.current = camera;
    initialFov.current = 75;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create initial mesh placeholder
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x1a1a1a });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Load initial scene
    loadScene(scenes[activeSceneIndex]);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (autoRotate && !isDragging.current) {
        lon.current += 0.03;
      }

      lat.current = Math.max(-85, Math.min(85, lat.current));
      phi.current = THREE.MathUtils.degToRad(90 - lat.current);
      theta.current = THREE.MathUtils.degToRad(lon.current);

      const x = 500 * Math.sin(phi.current) * Math.cos(theta.current);
      const y = 500 * Math.cos(phi.current);
      const z = 500 * Math.sin(phi.current) * Math.sin(theta.current);

      camera.lookAt(x, y, z);
      renderer.render(scene, camera);
    };

    animate();

    // Event handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;
      lon.current -= deltaX * 0.15;
      lat.current += deltaY * 0.15;
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
        lon.current -= deltaX * 0.15;
        lat.current += deltaY * 0.15;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = touchStartDistance.current - distance;
        camera.fov = Math.max(30, Math.min(90, camera.fov + delta * 0.05));
        camera.updateProjectionMatrix();
        touchStartDistance.current = distance;
      }
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.fov = Math.max(30, Math.min(90, camera.fov + e.deltaY * 0.03));
      camera.updateProjectionMatrix();
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
  }, [isOpen, scenes, loadScene, activeSceneIndex, autoRotate]);

  // Handle scene change
  useEffect(() => {
    if (isOpen && sceneRef.current && meshRef.current && scenes[activeSceneIndex]) {
      loadScene(scenes[activeSceneIndex]);
    }
  }, [activeSceneIndex, isOpen, loadScene, scenes]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!isFullscreen) {
      containerRef.current.parentElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
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
    lon.current = 0;
    lat.current = 0;
    if (cameraRef.current) {
      cameraRef.current.fov = initialFov.current;
      cameraRef.current.updateProjectionMatrix();
    }
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
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
            <Move className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-white font-display font-medium">{roomName}</h3>
            <p className="text-white/60 text-sm">
              {activeScene?.name} • 360° Virtual Tour
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setAutoRotate(!autoRotate)}
            className="text-white hover:bg-white/10"
            title={autoRotate ? "Stop auto-rotate" : "Start auto-rotate"}
          >
            <RotateCcw className={`w-5 h-5 ${autoRotate ? "animate-spin" : ""}`} style={{ animationDuration: "3s" }} />
          </Button>
          
          {activeScene?.type === "video" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="text-white hover:bg-white/10"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={resetView}
            className="text-white hover:bg-white/10"
            title="Reset view"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:bg-white/10"
          >
            {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Scene Switcher - Side Panel */}
      {scenes.length > 1 && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
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
            <p className="text-white/50 text-sm mt-1">Preparing 360° experience</p>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/70 backdrop-blur-md rounded-full border border-white/10">
        <p className="text-white/90 text-sm flex items-center gap-3">
          <Move className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline">Drag to explore • Scroll to zoom • Click scenes to switch</span>
          <span className="sm:hidden">Drag to explore • Pinch to zoom</span>
        </p>
      </div>

      {/* Scene indicator dots (mobile) */}
      {scenes.length > 1 && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 sm:hidden">
          {scenes.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSceneChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeSceneIndex 
                  ? "bg-primary w-6" 
                  : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};