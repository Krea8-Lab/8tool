import { toast } from "../components/toast";

export const BASE_URL = typeof window !== "undefined"
  ? window.location.origin
  : "http://localhost:3000";

export type RefProps = "codeImage";

export async function shortenUrl(url: string, ref: RefProps) {
  const response = await fetch(`/api/shorten-url?url=${encodeURIComponent(url)}&ref=${ref}`).then((res) =>
    res.json(),
  );

  if (response.link) {
    return response.link as string;
  }

  console.error("Failed to shorten URL", response);
  throw new Error("Unable to shorten this link");
}
