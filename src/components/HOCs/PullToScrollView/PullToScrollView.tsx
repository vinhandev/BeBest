import React from 'react';
import { RefreshControl, ScrollView, ScrollViewProps } from 'react-native';

type Props = ScrollViewProps & {
  onRefresh: () => Promise<void>;
};
export default function PullToScrollView({ onRefresh, ...props }: Props) {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      {...props}
    />
  );
}
