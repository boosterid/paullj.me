/// <reference types="@sveltejs/kit" />

// FIXME: Workaround till this is sorted out https://github.com/ricokahler/sanity-codegen/issues/6
declare namespace Sanity {
  namespace Schema {
    type Code = {
      _type: 'code';
      language?: string;
      filename?: string;
      highlightedLines?: number[];
      code: string;
    }
  }
}
