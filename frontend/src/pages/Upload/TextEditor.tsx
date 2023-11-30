import { useState } from 'react';
import { Box, SimpleGrid, TypographyStylesProvider } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext, Link } from '@mantine/tiptap';
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
import { template1, template2 } from '@/utilities/descriptionTemplates';

function TextEditor({ description = '' }: { description?: string }) {
  const [content, setContent] = useState(description);

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
        placeholder: `Talk about features, gameplay mechanics, and story details here! Try clicking the pencil icons in the toolbar for some examples!`,
      }),
      Underline,
      Link,
      Superscript,
      SubScript,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content,
  });

  return (
    <Box>
      <RichTextEditor editor={editor}>
        <RichTextEditor.Toolbar sticky stickyOffset={60}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold icon={BoldIcon} />
            <RichTextEditor.Italic icon={ItalicIcon} />
            <RichTextEditor.Underline icon={UnderlineIcon} />
            <RichTextEditor.Strikethrough icon={StrikethroughIcon} />
            <RichTextEditor.ClearFormatting icon={ClearFormattingIcon} />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control
              onClick={() => {
                editor?.commands.undo();
              }}
              aria-label="Undo"
              title="Undo"
            >
              <UndoIcon />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => {
                editor?.commands.redo();
              }}
              aria-label="Redo"
              title="Redo"
            >
              <RedoIcon />
            </RichTextEditor.Control>
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

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control
              onClick={() => {
                editor?.commands.clearContent();
                editor?.commands.insertContentAt(0, template1);
              }}
              aria-label="Insert template: example 1"
              title="Insert template: example 1"
            >
              <TemplateIcon />
            </RichTextEditor.Control>
            <RichTextEditor.Control
              onClick={() => {
                editor?.commands.clearContent();
                editor?.commands.insertContentAt(0, template2);
              }}
              aria-label="Insert template: example 2"
              title="Insert template: example 2"
            >
              <TemplateIcon />
            </RichTextEditor.Control>
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <SimpleGrid cols={{ base: 1, md: 2 }}>
          <RichTextEditor.Content />
          <Box h="auto" p="md" bg={'gray.0'} style={{ borderRadius: '5px' }}>
            <TypographyStylesProvider p="0">
              {/* @ts-ignore */}
              <div dangerouslySetInnerHTML={{ __html: editor?.getHTML() }} />
            </TypographyStylesProvider>
          </Box>
        </SimpleGrid>
      </RichTextEditor>
    </Box>
  );
}

export default TextEditor;
