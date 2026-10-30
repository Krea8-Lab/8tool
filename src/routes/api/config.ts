import { PADDING_OPTIONS } from "~/apps/code/store/padding";
import { THEMES } from "~/apps/code/store/themes";
import { LANGUAGES } from "~/apps/code/util/languages";

export async function GET() {
  const languages = Object.entries(LANGUAGES).map(([key, { src: _src, ...rest }]) => ({
    id: key,
    ...rest,
  }));
  const themes = Object.entries(THEMES).map(
    ([_key, { syntax: _syntax, icon: _icon, ...rest }]) => ({
      ...rest,
    }),
  );
  const padding = PADDING_OPTIONS;

  return Response.json({ languages, themes, padding });
}
