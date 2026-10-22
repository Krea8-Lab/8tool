import { LANGUAGES } from "@/util/languages";
import { THEMES } from "@/store/themes";
import { PADDING_OPTIONS } from "@/store/padding";

export async function GET() {
  const languages = Object.entries(LANGUAGES).map(([key, { src, ...rest }]) => ({
    id: key,
    ...rest,
  }));
  const themes = Object.entries(THEMES).map(([_key, { syntax, icon, ...rest }]) => ({
    ...rest,
  }));
  const padding = PADDING_OPTIONS;

  return Response.json({ languages, themes, padding });
}
