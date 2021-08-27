/// <reference types="@sanity-codegen/types" />

declare namespace Sanity {
  namespace Schema {
    /**
     * Post
     */
    interface Post extends Sanity.Document {
      _type: "post";

      /**
       * Title - `String`
       */
      title?: string;

      /**
       * Slug - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Description - `String`
       */
      description?: string;

      /**
       * Published at - `Datetime`
       */
      publishedAt?: string;

      /**
       * Body - `RegistryReference`
       */
      body?: BlockContent;
    }

    /**
     * Author
     */
    interface Author extends Sanity.Document {
      _type: "author";

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Slug - `Slug`
       */
      slug?: {
        _type: "slug";
        current: string;
      };

      /**
       * Image - `Image`
       */
      image?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * Biography - `Array`
       */
      biography?: Array<Sanity.Keyed<Sanity.Block>>;
    }

    type BlockContent = Array<
      Sanity.Keyed<Sanity.Block> | Sanity.Keyed<Figure> | Sanity.Keyed<Code>
    >;

    type Figure = {
      _type: "figure";

      /**
       * Image - `Image`
       */
      image?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * Alternative Text - `String`
       */
      alt?: string;

      /**
       * Caption - `String`
       */
      caption?: string;

      /**
       * Featured - `Boolean`
       */
      featured?: boolean;
    };

    type Document = Post | Author;
  }
}
