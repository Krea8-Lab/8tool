import { Button } from "@/components/button";
import { WandIcon } from "@/components/icons";
import { toast } from "@/components/toast";
import { code, setCode, selectedLanguage, setSelectedLanguage } from "@/store/code";
import formatCode, { formatterSupportedLanguages } from "@/util/formatCode";
import { cn } from "@/utils/cn";
import useHotkeys from "@/utils/useHotkeys";

export const FormatCodeButton = () => {
  const handleFormatCode = () => {
    const lang = selectedLanguage();
    const isSupported = lang && formatterSupportedLanguages.includes(lang.name);
    if (!isSupported) {
      toast.error("Formatting is not supported for this language");
      return;
    }
    const currentCode = code();
    if (!currentCode || !lang) {
      return;
    }

    toast
      .promise(
        formatCode(currentCode, lang).then((formatted) => {
          setCode(formatted);
          setSelectedLanguage(lang);
        }),
        {
          loading: "Formatting code...",
          success: "Formatted code!",
          error: (error: any) => {
            const errorMessage = error.message;
            return {
              message: "Code formatting failed",
              description: () => (
                <pre class="scrollbar-hide w-full max-w-[300px] overflow-auto rounded bg-gray-a3 p-2.5 text-xs">
                  <code class="w-full">{errorMessage}</code>
                </pre>
              ),
            };
          },
        },
      )
      .catch(() => {
        // Handled via toast error notification; prevent unhandled promise rejection
      });
  };

  useHotkeys("shift+option+f", (event) => {
    event.preventDefault();
    handleFormatCode();
  });

  return (
    // <Show when={isClient()}>
    <Button
      onClick={handleFormatCode}
      variant="transparent"
      class={cn(
        "hidden",
        selectedLanguage() &&
          formatterSupportedLanguages.includes(selectedLanguage()!.name) &&
          "gap-2 sm:inline-flex",
      )}
    >
      <WandIcon width={16} height={16} />
      <span>Format Code</span>
    </Button>
    // </Show>
  );
};

export default FormatCodeButton;
