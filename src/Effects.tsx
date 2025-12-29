import { EffectComposer, N8AO, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";

function Effects() {
  return (
    <EffectComposer enableNormalPass={false}>
      <N8AO
        intensity={2.9}
        aoRadius={0.3}
        aoSamples={14}
        denoiseSamples={4}
        denoiseRadius={9}
        distanceFalloff={0.2}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}

export default Effects;
