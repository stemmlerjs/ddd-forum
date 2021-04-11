
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { PostFilterType } from '../../modules/forum/components/posts/filters/components/PostFilters';

export function useIndexPage () {
  const location = useLocation()
  const [_activeFilter, _setActiveFilter] = useState<PostFilterType>('POPULAR');

  const setActiveFilter = (filter: PostFilterType) => {
    _setActiveFilter(filter);
  }

  const setDefaultActiveFilter = () => {
    const showNewFilter = (location.search as string).includes('show=new');

    let activeFilter: PostFilterType = _activeFilter;

    if (showNewFilter) {
      activeFilter = 'NEW';
    }

    setActiveFilter(activeFilter);
  }

  useEffect(setDefaultActiveFilter, []);
  
  return {
    state: { activeFilter: _activeFilter },
    operations: { setActiveFilter }
  }
}