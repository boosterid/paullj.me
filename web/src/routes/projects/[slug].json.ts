import groq from 'groq';
import { parseISO, format } from 'date-fns';
import { sanity } from '$lib/sanity';
import { generateImage, generateImages } from '$lib/utils/generateImage';

const query = groq`
  *[_type == "project" && slug.current == $slug][0] {
    title,
    publishedAt,
    description,
    coverImage { ..., asset -> },
    body[] {
      ...,
      _type == 'figure' => {
        ...,
        image { ..., asset-> }
      }
    },
    members [] -> {
      name,
      avatar {
	      ...,
      	asset ->
    	}
    }
  }
`;

export type QueryResult = Pick<Sanity.Schema.Project, "title" | "description" | "body" | "publishedAt" | "coverImage"> & { members: Array<Sanity.Schema.Person>}

export const get = async ({ params }) => {
  const { slug } = params;

  const result = await sanity.fetch<QueryResult>(query, { slug });

  if (result) {
    const transformedBody = result.body?.map((block) => {
      if(block._type === 'figure') {
        return {
          ...block,
          image: block.image ? generateImages(block.image) : null
        }
      } else {
        return block
      }
    });

    const transformedMembers = result.members?.map(({ name, avatar}) => ({
      name,
      avatar: avatar ? generateImage(avatar, 100, 100) : null
    }));

    return {
      body: {
        ...result,
        body: transformedBody ?? [],
        members: transformedMembers ?? [],
        coverImage: generateImages(result.coverImage),
        publishedAt: result.publishedAt ? format(parseISO(result.publishedAt), "EEE do MMMM ''yy") : "N/A"
      },
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    }
  }

  return {
    status: 404,
    error: new Error(`Could not find project /${slug} from Sanity.io`)
  };
};
