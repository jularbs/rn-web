export interface IPost {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  author: Types.ObjectId;
  categories: Types.ObjectId[];
  tags: Types.ObjectId[];
  type: PostType;
  featuredImage?: Types.ObjectId;
  featuredImageCaption?: string;
  thumbnailImage?: Types.ObjectId;
  videoSourceUrl?: string;
  videoDuration?: string;
  status: PostStatus;
  publishedAt?: Date;
  viewCount: number;
  isFeatured: boolean;
  metaTitle?: string;
  metaDescription?: string;

  // SEO Fields
  keywords?: string;
  canonicalUrl?: string;

  // Robots meta
  robotsIndex: boolean;
  robotsFollow: boolean;
  robotsArchive: boolean;
  robotsSnippet: boolean;
  robotsImageIndex: boolean;

  // Open Graph
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
  ogImage?: Types.ObjectId;
  ogImageAlt?: string;

  // Twitter Cards
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterSite?: string;
  twitterCreator?: string;
  twitterImage?: Types.ObjectId;
  twitterImageAlt?: string;

  // Additional SEO
  seoAuthor?: string;
  publisher?: string;
  focusKeyword?: string;
  readingTime?: string;
  metaImage?: Types.ObjectId;
  metaImageAlt?: string;
  createdAt: Date;
  updatedAt: Date;
}
