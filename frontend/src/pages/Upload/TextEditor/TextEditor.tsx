import { useState, useEffect } from 'react';
import { Box, ThemeIcon } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';

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

const BoldIcon = () => <IconBold size="1.1rem" stroke={1.5} />;
const ItalicIcon = () => <IconItalic size="1.1rem" stroke={1.5} />;
const UnderlineIcon = () => <IconUnderline size="1.1rem" stroke={1.5} />;
const StrikethroughIcon = () => <IconStrikethrough size="1.1rem" stroke={1.5} />;
const CodeBlockIcon = () => <IconCode size="1.1rem" stroke={1.5} />;
const ClearFormattingIcon = () => <IconClearFormatting size="1.1rem" stroke={1.5} />;
const H1Icon = () => <IconH1 size="1.1rem" stroke={1.5} />;
const H2Icon = () => <IconH2 size="1.1rem" stroke={1.5} />;
const H3Icon = () => <IconH3 size="1.1rem" stroke={1.5} />;
const H4Icon = () => <IconH4 size="1.1rem" stroke={1.5} />;
const BlockquoteIcon = () => <IconBlockquote size="1.1rem" stroke={1.5} />;
const HrIcon = () => <IconLineDashed size="1.1rem" stroke={1.5} />;
const BulletListIcon = () => <IconList size="1.1rem" stroke={1.5} />;
const OrderedListIcon = () => <IconListNumbers size="1.1rem" stroke={1.5} />;
const SuperscriptIcon = () => <IconSuperscript size="1.1rem" stroke={1.5} />;
const SubscriptIcon = () => <IconSubscript size="1.1rem" stroke={1.5} />;
const LinkIcon = () => <IconLink size="1.1rem" stroke={1.5} />;
const UnlinkIcon = () => <IconLinkOff size="1.1rem" stroke={1.5} />;
const AlignLeftIcon = () => <IconAlignLeft size="1.1rem" stroke={1.5} />;
const AlignCenterIcon = () => <IconAlignCenter size="1.1rem" stroke={1.5} />;
const AlignJustifyIcon = () => <IconAlignJustified size="1.1rem" stroke={1.5} />;
const AlignRightIcon = () => <IconAlignRight size="1.1rem" stroke={1.5} />;
const TemplateIcon = () => <IconPencilQuestion size="1.1rem" stroke={1.5} />;
const UndoIcon = () => <IconArrowBackUp size="1.1rem" stroke={1.5} />;
const RedoIcon = () => <IconArrowForwardUp size="1.1rem" stroke={1.5} />;

import classes from './TextEditor.module.css';
import { template1, template2 } from '@/utilities/textEditor/descriptions.js';

function TextEditor({ useFor = '', props }: { useFor?: string; props: any }) {
  const [content, setContent] = useState('');

  let placeholder = '';
  switch (useFor) {
    case 'description':
      placeholder =
        'Talk about features, gameplay mechanics, and story details here! Try clicking the pencil icons in the toolbar for some examples!';
      break;
    case 'instructions':
      placeholder =
        'For uploaded games, use this section to explain the process on how to download, install, and run your program!';
      break;
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: classes.heading,
          },
        },
        paragraph: {
          HTMLAttributes: {
            class: classes.paragraph,
          },
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  const RedoControl = () => {
    return (
      <RichTextEditor.Control
        onClick={() => {
          editor?.commands.redo();
        }}
        aria-label="redo"
        title="Redo"
      >
        <RedoIcon />
      </RichTextEditor.Control>
    );
  };

  const UndoControl = () => {
    return (
      <RichTextEditor.Control
        onClick={() => {
          editor?.commands.undo();
        }}
        aria-label="undo"
        title="Undo"
      >
        <UndoIcon />
      </RichTextEditor.Control>
    );
  };

  const TemplateControl = ({
    template,
    num,
    color = 'coyote-blue',
  }: {
    template: string;
    num: number;
    color?: string;
  }) => {
    return (
      <RichTextEditor.Control
        onClick={() => {
          editor?.commands.clearContent();
          editor?.commands.insertContentAt(0, template);
        }}
        aria-label={`Insert template: example ${num}`}
        title={`Insert template: example ${num}`}
      >
        <ThemeIcon variant="transparent" color={color}>
          <TemplateIcon />
        </ThemeIcon>
      </RichTextEditor.Control>
    );
  };

  useEffect(() => {
    if (useFor === 'description') {
      if (editor?.getText().trim() === '') {
        props.setFieldValue('description', '');
      } else {
        props.setFieldValue('description', editor?.getHTML());
      }
    } else if (useFor === 'instructions') {
      if (editor?.getText().trim() === '') {
        props.setFieldValue('instructions', '');
      } else {
        props.setFieldValue('instructions', editor?.getHTML());
      }
    }
  }, [editor?.getHTML()]);

  return (
    <Box>
      <RichTextEditor editor={editor} mih={250} maw={1000}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold icon={BoldIcon} />
            <RichTextEditor.Italic icon={ItalicIcon} />
            <RichTextEditor.Underline icon={UnderlineIcon} />
            <RichTextEditor.Strikethrough icon={StrikethroughIcon} />
            <RichTextEditor.CodeBlock icon={CodeBlockIcon} />
            <RichTextEditor.ClearFormatting icon={ClearFormattingIcon} />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <UndoControl />
            <RedoControl />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 icon={H1Icon} />
            <RichTextEditor.H2 icon={H2Icon} />
            <RichTextEditor.H3 icon={H3Icon} />
            <RichTextEditor.H4 icon={H4Icon} />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote icon={BlockquoteIcon} />
            <RichTextEditor.Hr icon={HrIcon} />
            <RichTextEditor.BulletList icon={BulletListIcon} />
            <RichTextEditor.OrderedList icon={OrderedListIcon} />
            <RichTextEditor.Subscript icon={SubscriptIcon} />
            <RichTextEditor.Superscript icon={SuperscriptIcon} />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link icon={LinkIcon} />
            <RichTextEditor.Unlink icon={UnlinkIcon} />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft icon={AlignLeftIcon} />
            <RichTextEditor.AlignCenter icon={AlignCenterIcon} />
            <RichTextEditor.AlignJustify icon={AlignJustifyIcon} />
            <RichTextEditor.AlignRight icon={AlignRightIcon} />
          </RichTextEditor.ControlsGroup>
          {useFor === 'description' && (
            <RichTextEditor.ControlsGroup>
              <TemplateControl template={template1} num={1} color={'grape'} />
              <TemplateControl template={template2} num={2} color={'red'} />
            </RichTextEditor.ControlsGroup>
          )}
          {useFor === 'instructions' && (
            <RichTextEditor.ControlsGroup></RichTextEditor.ControlsGroup>
          )}
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Box>
  );
}

export default TextEditor;
