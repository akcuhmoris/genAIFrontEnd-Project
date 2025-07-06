import Editor from "@monaco-editor/react";

export function CodeEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string | undefined) => void;
}) {
  return (
    <Editor
      height="500px"
      defaultLanguage="html"
      value={value}
      onChange={onChange}
    />
  );
}
