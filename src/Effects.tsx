import {
  Bloom,
  EffectComposer,
  N8AO,
  ToneMapping,
} from "@react-three/postprocessing";
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
      <Bloom
        mipmapBlur
        intensity={0.9}
        luminanceThreshold={0.15}
        radius={0.6}
      />
      <ToneMapping mode={ToneMappingMode.REINHARD} />
    </EffectComposer>
  );
}

export default Effects;
