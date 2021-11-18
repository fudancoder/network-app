// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useIPFS, useProjectMetadata, useProjectQuery } from '../containers';
import { ProjectDetails, ProjectMetadata } from '../models';
import { AsyncData } from '../utils';
import { useAsyncMemo } from '.';
import { getDeployment } from './useDeployment';
import { GetProject_project as Project } from '../__generated__/GetProject';

type ProjectDetailsQuery = Omit<Project, 'metadata' | '__typename'> & {
  metadata: ProjectMetadata;
  deployment: ProjectDetails['deployment'];
};

export function useProjectFromQuery(id: string): AsyncData<ProjectDetailsQuery> {
  const { catSingle } = useIPFS();
  const { getMetadataFromCid } = useProjectMetadata();

  const { data, loading, error } = useProjectQuery({ id });

  const {
    data: project,
    loading: loadingData,
    error: errorData,
  } = useAsyncMemo<ProjectDetailsQuery | undefined>(async () => {
    if (!data?.project) {
      return undefined;
    }

    const query = data.project;
    const metadata = await getMetadataFromCid(query.metadata);
    const deployment = await getDeployment(catSingle, query.currentDeployment);

    return {
      ...query,
      metadata,
      deployment,
    };
  }, [data, catSingle, getMetadataFromCid]);

  return {
    data: project,
    error: error || errorData,
    loading: loading || loadingData,
  };
}