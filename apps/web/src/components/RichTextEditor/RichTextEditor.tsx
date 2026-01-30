import { useMemo } from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteEditor, type Block } from "@blocknote/core";
import * as styles from "./RichTextEditor.css";

interface RichTextEditorProps {
  initialContent?: Block[];
  onChange: (content: Block[]) => void;
}

export function RichTextEditor({
  initialContent,
  onChange,
}: RichTextEditorProps) {
  const editor = useMemo(() => {
    return BlockNoteEditor.create({
      initialContent: initialContent?.length ? initialContent : undefined,
    });
  }, []);

  return (
    <div className={styles.editorWrapper}>
      <BlockNoteView
        editor={editor}
        onChange={() => onChange(editor.document as Block[])}
        theme="light"
      />
    </div>
  );
}
