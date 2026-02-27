export {
  CodeBlock,
  CompactCodeBlock,
  type CodeBlockProps,
  type CompactCodeBlockProps,
} from '@ui/components/infsh/code-block/code-block'

// Types
export type { Token, TokenType, LanguageDefinition } from '@ui/components/infsh/code-block/types'

// Language utilities
export { getLanguage, normalizeLanguage, languages } from '@ui/components/infsh/code-block/languages'

// Tokenizer (for advanced usage)
export { tokenize } from '@ui/components/infsh/code-block/tokenizer'

// Styles (for customization)
export { tokenStyles, getTokenStyle } from '@ui/components/infsh/code-block/styles'
