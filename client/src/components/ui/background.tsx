import { Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        <Stars radius={50} count={2500} factor={4} fade speed={2} />
      </Canvas>
    </div>
  );
};

export default Background;
