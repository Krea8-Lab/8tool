import { createSignal, onMount, Show } from "solid-js";
import { WandIcon } from "@/components/icons";
import formatCode, { formatterSupportedLanguages } from "@/util/formatCode";
import { code, setCode, selectedLanguage, setSelectedLanguage } from "@/store/code";
import useHotkeys from "@/utils/useHotkeys";
import { Button } from "@/components/button";
import { toast } from "@/components/toast";
import { cn } from "@/utils/cn";

export const FormatCodeButton = () => {
  const [isClient, setIsClient] = createSignal(false);

  onMount(() => {
    setIsClient(true);
  });

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
                <pre class="scrollbar-hide bg-gray-a3 w-full max-w-[300px] overflow-auto rounded p-2.5 text-xs">
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
          "sm:inline-flex gap-2",
      )}
    >
      <WandIcon width={16} height={16} />
      <span>Format Code</span>
    </Button>
    // </Show>
  );
};

export default FormatCodeButton;
