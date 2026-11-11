const { withGradleProperties } = require('expo/config-plugins');

/**
 * llama.rn compiles one native wrapper per CPU-feature variant, each a slow full build.
 * Left alone that is eight variants and blows the EAS 45-minute limit. Two cover every
 * 64-bit ARM phone: the generic one, and the one modern chips use. The library falls back
 * to the generic wrapper at runtime when a faster one is missing.
 */
module.exports = function withLlamaBuild(config) {
  return withGradleProperties(config, (cfg) => {
    cfg.modResults = cfg.modResults.filter((p) => !(p.type === 'property' && p.key === 'rnllamaVariants'));
    cfg.modResults.push({ type: 'property', key: 'rnllamaVariants', value: 'rnllama,rnllama_v8_2_dotprod' });
    return cfg;
  });
};
