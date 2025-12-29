const Environment = () => {
  return (
    <>
      <ambientLight intensity={0.7} color="#4b3d8f" />
      <directionalLight
        position={[3, 3.5, 4]}
        intensity={5.5}
        color="#ff80ab"
      />
      <directionalLight
        position={[-3, 1, -1]}
        intensity={2.3}
        color="#3f51b5"
      />
    </>
  );
};

export default Environment;
