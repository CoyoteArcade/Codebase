// import { useEffect } from 'react';
// import { ThemeIcon } from '@mantine/core';
/* disabled for now */

// import { RichTextEditor, Link } from '@mantine/tiptap';
// import { useEditor } from '@tiptap/react';
// import StarterKit from '@tiptap/starter-kit';
// import Underline from '@tiptap/extension-underline';
// import TextAlign from '@tiptap/extension-text-align';
// import Superscript from '@tiptap/extension-superscript';
// import SubScript from '@tiptap/extension-subscript';
// import Placeholder from '@tiptap/extension-placeholder';

import {
  IconBold,
  IconItalic,
  IconUnderline,
  IconStrikethrough,
  IconCode,
  IconClearFormatting,
  IconBlockquote,
  IconLineDashed,
  IconList,
  IconListNumbers,
  IconSuperscript,
  IconSubscript,
  IconLink,
  IconLinkOff,
  IconAlignLeft,
  IconAlignCenter,
  IconAlignJustified,
  IconAlignRight,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconPencilQuestion,
} from '@tabler/icons-react';

// import classes from './TextEditor.module.css';
// import { template1, template2 } from '@/utilities/textEditor/descriptions';

function BoldIcon() {
  return <IconBold size="1.1rem" stroke={1.5} />;
}
function ItalicIcon() {
  return <IconItalic size="1.1rem" stroke={1.5} />;
}
function UnderlineIcon() {
  return <IconUnderline size="1.1rem" stroke={1.5} />;
}
function StrikethroughIcon() {
  return <IconStrikethrough size="1.1rem" stroke={1.5} />;
}
function CodeBlockIcon() {
  return <IconCode size="1.1rem" stroke={1.5} />;
}
function ClearFormattingIcon() {
  return <IconClearFormatting size="1.1rem" stroke={1.5} />;
}
function H1Icon() {
  return <IconH1 size="1.1rem" stroke={1.5} />;
}
function H2Icon() {
  return <IconH2 size="1.1rem" stroke={1.5} />;
}
function H3Icon() {
  return <IconH3 size="1.1rem" stroke={1.5} />;
}
function H4Icon() {
  return <IconH4 size="1.1rem" stroke={1.5} />;
}
function BlockquoteIcon() {
  return <IconBlockquote size="1.1rem" stroke={1.5} />;
}
function HrIcon() {
  return <IconLineDashed size="1.1rem" stroke={1.5} />;
}
function BulletListIcon() {
  return <IconList size="1.1rem" stroke={1.5} />;
}
function OrderedListIcon() {
  return <IconListNumbers size="1.1rem" stroke={1.5} />;
}
function SuperscriptIcon() {
  return <IconSuperscript size="1.1rem" stroke={1.5} />;
}
function SubscriptIcon() {
  return <IconSubscript size="1.1rem" stroke={1.5} />;
}
function LinkIcon() {
  return <IconLink size="1.1rem" stroke={1.5} />;
}
function UnlinkIcon() {
  return <IconLinkOff size="1.1rem" stroke={1.5} />;
}
function AlignLeftIcon() {
  return <IconAlignLeft size="1.1rem" stroke={1.5} />;
}
function AlignCenterIcon() {
  return <IconAlignCenter size="1.1rem" stroke={1.5} />;
}
function AlignJustifyIcon() {
  return <IconAlignJustified size="1.1rem" stroke={1.5} />;
}
function AlignRightIcon() {
  return <IconAlignRight size="1.1rem" stroke={1.5} />;
}
function TemplateIcon() {
  return <IconPencilQuestion size="1.1rem" stroke={1.5} />;
}
function UndoIcon() {
  return <IconArrowBackUp size="1.1rem" stroke={1.5} />;
}
function RedoIcon() {
  return <IconArrowForwardUp size="1.1rem" stroke={1.5} />;
}

function TextEditor({ useFor = '', props }: { useFor?: string; props: any }) {

  return <p>Placeholder for now</p>;
  // const content = '';

  // let placeholder = '';
  // switch (useFor) {
  //   case 'description':
  //     placeholder = 'Talk about features, gameplay mechanics, and story details here! Try clicking the pencil icons in the toolbar for some examples!';
  //     break;
  //   case 'instructions':
  //     placeholder = 'For uploaded games, use this section to explain the process on how to download, install, and run your program!';
  //     break;
  //   default:
  //     placeholder = 'Placeholder Text';
  //     break;
  // }

  // const editor = useEditor({
  //   extensions: [
  //     StarterKit.configure({
  //       heading: {
  //         HTMLAttributes: {
  //           class: classes.heading,
  //         },
  //       },
  //       paragraph: {
  //         HTMLAttributes: {
  //           class: classes.paragraph,
  //         },
  //       },
  //     }),
  //     Placeholder.configure({
  //       placeholder,
  //     }),
  //     Underline,
  //     Link,
  //     Superscript,
  //     SubScript,
  //     TextAlign.configure({ types: ['heading', 'paragraph'] }),
  //   ],
  //   content,
  // });

  // function RedoControl() {
  //   return (
  //     <RichTextEditor.Control
  //       onClick={() => {
  //         editor?.commands.redo();
  //       }}
  //       aria-label="redo"
  //       title="Redo"
  //     >
  //       <RedoIcon />
  //     </RichTextEditor.Control>
  //   );
  // }

  // function UndoControl() {
  //   return (
  //     <RichTextEditor.Control
  //       onClick={() => {
  //         editor?.commands.undo();
  //       }}
  //       aria-label="undo"
  //       title="Undo"
  //     >
  //       <UndoIcon />
  //     </RichTextEditor.Control>
  //   );
  // }

  // function TemplateControl({
  //   template,
  //   num,
  //   color = 'coyote-blue',
  // }: {
  //   template: string;
  //   num: number;
  //   color?: string;
  // }) {
  //   return (
  //     <RichTextEditor.Control
  //       onClick={() => {
  //         editor?.commands.clearContent();
  //         editor?.commands.insertContentAt(0, template);
  //       }}
  //       aria-label={`Insert template: example ${num}`}
  //       title={`Insert template: example ${num}`}
  //     >
  //       <ThemeIcon variant="transparent" color={color}>
  //         <TemplateIcon />
  //       </ThemeIcon>
  //     </RichTextEditor.Control>
  //   );
  // }

  // useEffect(() => {
  //   if (useFor === 'description') {
  //     if (editor?.getText().trim() === '') {
  //       props.setFieldValue('description', '');
  //     } else {
  //       props.setFieldValue('description', editor?.getHTML());
  //     }
  //   } else if (useFor === 'instructions') {
  //     if (editor?.getText().trim() === '') {
  //       props.setFieldValue('instructions', '');
  //     } else {
  //       props.setFieldValue('instructions', editor?.getHTML());
  //     }
  //   }
  // }, [editor?.getHTML()]);

  // return (
  //   <RichTextEditor editor={editor} mih={250} w="100%">
  //     <RichTextEditor.Toolbar sticky stickyOffset={60}>
  //       <RichTextEditor.ControlsGroup>
  //         <RichTextEditor.Bold icon={BoldIcon} />
  //         <RichTextEditor.Italic icon={ItalicIcon} />
  //         <RichTextEditor.Underline icon={UnderlineIcon} />
  //         <RichTextEditor.Strikethrough icon={StrikethroughIcon} />
  //         <RichTextEditor.CodeBlock icon={CodeBlockIcon} />
  //         <RichTextEditor.ClearFormatting icon={ClearFormattingIcon} />
  //       </RichTextEditor.ControlsGroup>

  //       <RichTextEditor.ControlsGroup>
  //         <UndoControl />
  //         <RedoControl />
  //       </RichTextEditor.ControlsGroup>

  //       <RichTextEditor.ControlsGroup>
  //         <RichTextEditor.H1 icon={H1Icon} />
  //         <RichTextEditor.H2 icon={H2Icon} />
  //         <RichTextEditor.H3 icon={H3Icon} />
  //         <RichTextEditor.H4 icon={H4Icon} />
  //       </RichTextEditor.ControlsGroup>

  //       <RichTextEditor.ControlsGroup>
  //         <RichTextEditor.Blockquote icon={BlockquoteIcon} />
  //         <RichTextEditor.Hr icon={HrIcon} />
  //         <RichTextEditor.BulletList icon={BulletListIcon} />
  //         <RichTextEditor.OrderedList icon={OrderedListIcon} />
  //         <RichTextEditor.Subscript icon={SubscriptIcon} />
  //         <RichTextEditor.Superscript icon={SuperscriptIcon} />
  //       </RichTextEditor.ControlsGroup>

  //       <RichTextEditor.ControlsGroup>
  //         <RichTextEditor.Link icon={LinkIcon} />
  //         <RichTextEditor.Unlink icon={UnlinkIcon} />
  //       </RichTextEditor.ControlsGroup>

  //       <RichTextEditor.ControlsGroup>
  //         <RichTextEditor.AlignLeft icon={AlignLeftIcon} />
  //         <RichTextEditor.AlignCenter icon={AlignCenterIcon} />
  //         <RichTextEditor.AlignJustify icon={AlignJustifyIcon} />
  //         <RichTextEditor.AlignRight icon={AlignRightIcon} />
  //       </RichTextEditor.ControlsGroup>
  //       {useFor === 'description' && (
  //         <RichTextEditor.ControlsGroup>
  //           <TemplateControl template={template1} num={1} color="grape" />
  //           <TemplateControl template={template2} num={2} color="red" />
  //         </RichTextEditor.ControlsGroup>
  //       )}
  //       {useFor === 'instructions' && <RichTextEditor.ControlsGroup />}
  //     </RichTextEditor.Toolbar>
  //     <RichTextEditor.Content />
  //   </RichTextEditor>
  // );
}

export default TextEditor;
