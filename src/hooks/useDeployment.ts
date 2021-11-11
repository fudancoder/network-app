// Copyright 2020-2021 OnFinality Limited authors & contributors
// SPDX-License-Identifier: Apache-2.0

import yaml from 'js-yaml';
import { ProjectManifestVersioned, VersionedProjectManifest } from '@subql/common';
import { useIPFS } from '../containers';
import { useAsyncMemo } from './useAsyncMemo';
import { buildSchema } from '../utils';
import { ProjectDetails } from '../models';

export function useDeployment(deploymentId: string) {
  const { catSingle } = useIPFS();

  return useAsyncMemo<ProjectDetails['deployment']>(async () => {
    const manifest = await catSingle(deploymentId)
      .then((data) => Buffer.from(data).toString())
      .then((str) => yaml.load(str))
      .then((obj) => {
        const manifest = new ProjectManifestVersioned(obj as VersionedProjectManifest);
        manifest.validate();

        return manifest;
      });

    const schema = await catSingle(manifest.schema.replace('ipfs://', ''))
      .then((data) => Buffer.from(data).toString())
      .then((str) => buildSchema(str));

    return {
      id: deploymentId,
      manifest,
      schema,
    };
  }, [deploymentId]);
}
