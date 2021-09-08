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
       * Author - `Reference`
       */
      author?: Sanity.Reference<Person>;

      /**
       * Image - `Image`
       */
      image?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * Published At - `Datetime`
       */
      publishedAt?: string;

      /**
       * Body - `RegistryReference`
       */
      body?: BlockContent;
    }

    /**
     * Person
     */
    interface Person extends Sanity.Document {
      _type: "person";

      /**
       * Name - `String`
       */
      name?: string;

      /**
       * Avatar - `Image`
       */
      avatar?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };
    }

    /**
     * Project
     */
    interface Project extends Sanity.Document {
      _type: "project";

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
       * Members - `Array`
       */
      members?: Array<Sanity.KeyedReference<Person>>;

      /**
       * Description - `Text`
       */
      description?: string;

      /**
       * Cover Image - `Image`
       */
      coverImage?: {
        asset: Sanity.Asset;
        crop?: Sanity.ImageCrop;
        hotspot?: Sanity.ImageHotspot;
      };

      /**
       * Categories - `Array`
       */
      categories?: Array<Sanity.KeyedReference<Category>>;

      /**
       * Published At - `Datetime`
       */
      publishedAt?: string;

      /**
       * Body - `RegistryReference`
       */
      body?: BlockContent;
    }

    /**
     * Site Settings
     */
    interface SiteSettings extends Sanity.Document {
      _type: "siteSettings";

      /**
       * Title - `String`
       */
      title?: string;

      /**
       * Description - `Text`
       */
      description?: string;

      /**
       * Email - `String`
       */
      email?: string;

      /**
       * GitHub URL - `Url`
       */
      githubUrl?: string;

      /**
       * LinkedIn URL - `Url`
       */
      linkedInUrl?: string;

      /**
       * Curriculum Vitae File - `File`
       */
      cvFile?: {
        asset: Sanity.Asset;
      };
    }

    /**
     * Category
     */
    interface Category extends Sanity.Document {
      _type: "category";

      /**
       * Title - `String`
       */
      title?: string;

      /**
       * Description - `Text`
       */
      description?: string;
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
       * Caption - `String`
       */
      caption?: string;

      /**
       * Featured - `Boolean`
       */
      featured?: boolean;
    };

    type Document = Post | Person | Project | SiteSettings | Category;
  }
}
