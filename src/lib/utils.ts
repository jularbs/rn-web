import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ReplaceHtmlEntities = (text: string) => {
  const translate_re = /&(nbsp|amp|quot|lt|gt);/g;
  const translate = { nbsp: " ", amp: "&", quot: '"', lt: "<", gt: ">" };

  return text.replace(translate_re, function (match, entity) {
    return translate[entity as keyof typeof translate];
  });
};

  //Split all paragraphs (even with attributes) and add ads in between, but exclude those in embed scripts
export const splitContentExcludingEmbeds = (htmlContent: string) => {
    // Define embed patterns to preserve
    const embedPatterns = [
      new RegExp('<blockquote[^>]*class="[^"]*twitter-tweet[^"]*"[^>]*>[\\s\\S]*?</blockquote>', 'gi'),
      new RegExp('<blockquote[^>]*class="[^"]*instagram-media[^"]*"[^>]*>[\\s\\S]*?</blockquote>', 'gi'),
      new RegExp('<blockquote[^>]*class="[^"]*tiktok-embed[^"]*"[^>]*>[\\s\\S]*?</blockquote>', 'gi'),
      new RegExp('<iframe[^>]*src="[^"]*facebook\\.com[^"]*"[^>]*>[\\s\\S]*?</iframe>', 'gi'),
      new RegExp('<iframe[^>]*src="[^"]*youtube\\.com[^"]*"[^>]*>[\\s\\S]*?</iframe>', 'gi'),
      new RegExp('<script[^>]*src="[^"]*twitter\\.com[^"]*"[^>]*>[\\s\\S]*?</script>', 'gi'),
      new RegExp('<script[^>]*src="[^"]*instagram\\.com[^"]*"[^>]*>[\\s\\S]*?</script>', 'gi'),
      new RegExp('<script[^>]*src="[^"]*tiktok\\.com[^"]*"[^>]*>[\\s\\S]*?</script>', 'gi')
    ];

    let processedContent = htmlContent;
    const embedPlaceholders: { [key: string]: string } = {};
    let placeholderIndex = 0;

    // Replace embeds with placeholders
    embedPatterns.forEach(pattern => {
      processedContent = processedContent.replace(pattern, (match) => {
        const placeholder = `__EMBED_PLACEHOLDER_${placeholderIndex}__`;
        embedPlaceholders[placeholder] = match;
        placeholderIndex++;
        return placeholder;
      });
    });

    // Split by paragraph tags
    const splitted = processedContent.split(/<p[^>]*>/);
    
    // Restore embeds and process content
    return splitted.map((node) => {
      let processedNode = node.replace("</p>", "");
      
      // Restore embed placeholders
      Object.keys(embedPlaceholders).forEach(placeholder => {
        processedNode = processedNode.replace(placeholder, embedPlaceholders[placeholder]);
      });
      
      return `${ReplaceHtmlEntities(processedNode)}`;
    });
  };

export function getImageSource(media: { key?: string; bucket?: string; location?: string; url?: string }): string {
  if (media?.url) {
    return media.url;
  }

  if (media?.location) {
    return media.location;
  }

  if (media?.key && media?.bucket) {
    return `${process.env.NEXT_PUBLIC_API_ENDPOINT}/v1/media?key=${media.key}&bucket=${media.bucket}`;
  }

  return media?.location || "";
}

// Convert 24-hour time (HH:MM:SS) to 12-hour format (HH:MM AM/PM)
export function convertTo12HourFormat(time24: string): string {
  // Parse the time string
  const [hours, minutes] = time24.split(':').map(Number);
  
  // Determine AM/PM
  const period = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hours to 12-hour format
  let hours12 = hours % 12;
  hours12 = hours12 === 0 ? 12 : hours12; // Convert 0 to 12 for midnight
  
  // Format with leading zeros for minutes
  const formattedMinutes = minutes.toString().padStart(2, '0');
  
  return `${hours12}:${formattedMinutes} ${period}`;
}

