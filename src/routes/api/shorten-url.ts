import { Dub } from "dub";
import { env } from "~/env";

const dub = new Dub({
  token: env.DUB_TOKEN,
});

const tagIdsByRef = {
  codeImage: "clsokhlen0001kz0gxlqfgpp0",
};

export type RefProps = keyof typeof tagIdsByRef;

const getTagId = (ref: RefProps) => {
  return ref ? tagIdsByRef[ref] : undefined;
};

function isAllowedHostname(hostname: string, requestHostname: string) {
  return (
    hostname === "ray.so" ||
    hostname.endsWith(".ray.so") ||
    hostname === "localhost" ||
    hostname === requestHostname
  );
}

export async function GET(event: { request: Request }) {
  const reqUrl = new URL(event.request.url);
  const searchParams = reqUrl.searchParams;
  const urlQuery = searchParams.get("url");
  const refQuery = searchParams.get("ref");

  if (!urlQuery) {
    return Response.json({ error: "Missing URL" }, { status: 400 });
  }

  if (!refQuery) {
    return Response.json({ error: "Missing ref" }, { status: 400 });
  }

  const tagId = getTagId(refQuery as RefProps);
  if (!tagId) {
    return Response.json({ error: "Invalid ref" }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(urlQuery);
  } catch {
    return Response.json({ error: "Invalid URL" }, { status: 400 });
  }

  if (!isAllowedHostname(parsedUrl.hostname, reqUrl.hostname)) {
    return Response.json({ error: "Unable to shorten this link" }, { status: 400 });
  }

  try {
    const link = await dub.links.create({
      url: parsedUrl.href,
      domain: "go.ray.so",
      tagIds: [tagId],
    });
    return Response.json({ link: `https://ray.so/${link.key}` });
  } catch {
    return Response.json({ error: "Unable to shorten this link" }, { status: 500 });
  }
}
