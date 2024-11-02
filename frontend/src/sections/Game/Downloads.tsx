import {
  Group, List, Skeleton, Stack, Text,
} from '@mantine/core';
import { MouseEventHandler } from 'react';
import PlatformIcon from '@/components/GameCard/PlatformIcon/PlatformIcon';

export default function Downloads({
  loading,
  gameAssetLinks,
  handlePurchase,
}: {
  loading:boolean,
  gameAssetLinks:{
    message: '',
    images: [],
    windows: '',
    mac: '',
    linux: '',
  },
  handlePurchase: MouseEventHandler }) {
  return (
    <Skeleton visible={loading} height={loading ? 150 : '100%'} width={loading ? 320 : '100%'}>
      <Stack>
        {gameAssetLinks.windows || gameAssetLinks.mac || gameAssetLinks.linux ? (
          <List listStyleType="none">
            {gameAssetLinks.windows && (
            <List.Item>
              <Group>
                {gameAssetLinks.windows && (
                <PlatformIcon key="windows" platform="windows" />
                )}
                <Text size="lg">
                  <a href={gameAssetLinks.windows} onClick={handlePurchase}>
                    Download for Windows
                  </a>
                </Text>
              </Group>
            </List.Item>
            )}

            {gameAssetLinks.mac && (
            <List.Item>
              <Group>
                {gameAssetLinks.mac && <PlatformIcon key="mac" platform="mac" />}
                <Text size="lg">
                  <a href={gameAssetLinks.mac} onClick={handlePurchase}>
                    Download for macOS
                  </a>
                </Text>
              </Group>
            </List.Item>
            )}
            {gameAssetLinks.linux && (
            <List.Item>
              <Group>
                {gameAssetLinks.linux && <PlatformIcon key="linux" platform="linux" />}
                {' '}
                <Text size="lg">
                  <a href={gameAssetLinks.linux} onClick={handlePurchase}>
                    Download for Linux
                  </a>
                </Text>
              </Group>
            </List.Item>
            )}
          </List>
        ) : (
          <Text c="dimmed">No Downloads Available...</Text>
        )}
      </Stack>
    </Skeleton>
  );
}
