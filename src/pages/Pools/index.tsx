// Copyright 2022 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageRowWrapper,
  RowPrimaryWrapper,
  RowSecondaryWrapper,
} from 'Wrappers';
import { CardWrapper, CardHeaderWrapper } from 'library/Graphs/Wrappers';
import { PageTitle } from 'library/PageTitle';
import { StatBoxList } from 'library/StatBoxList';
import { OpenAssistantIcon } from 'library/OpenAssistantIcon';
import { useApi } from 'contexts/Api';
import { PoolList } from 'library/PoolList';
import { useActivePool } from 'contexts/Pools/ActivePool';
import { APIContextInterface } from 'types/api';
import { BondedPoolsContextState, ActivePoolContextState } from 'types/pools';
import { useBondedPools } from 'contexts/Pools/BondedPools';
import ActivePoolsStatBox from './Stats/ActivePools';
import MinJoinBondStatBox from './Stats/MinJoinBond';
import MinCreateBondStatBox from './Stats/MinCreateBond';
import { Status } from './Status';
import { ManageBond } from './ManageBond';
import { ManagePool } from './ManagePool';
import { PageProps } from '../types';
import { Roles } from './Roles';

export const Pools = (props: PageProps) => {
  const { page } = props;
  const { title } = page;
  const { network } = useApi() as APIContextInterface;
  const navigate = useNavigate();
  const { bondedPools } = useBondedPools() as BondedPoolsContextState;
  const { isBonding } = useActivePool() as ActivePoolContextState;

  const [activeTab, setActiveTab] = useState(0);

  // back to overview if pools are not supported on network
  useEffect(() => {
    if (!network.features.pools) {
      navigate('/#/overview', { replace: true });
    }
  }, [network]);

  return (
    <>
      <PageTitle
        title={title}
        tabs={[
          {
            title: 'Overview',
            active: activeTab === 0,
            onClick: () => setActiveTab(0),
          },
          {
            title: 'All Pools',
            active: activeTab === 1,
            onClick: () => setActiveTab(1),
          },
        ]}
      />
      {activeTab === 0 && (
        <>
          <StatBoxList>
            <ActivePoolsStatBox />
            <MinJoinBondStatBox />
            <MinCreateBondStatBox />
          </StatBoxList>
          <PageRowWrapper className="page-padding" noVerticalSpacer>
            <RowPrimaryWrapper hOrder={1} vOrder={0}>
              <Status setActiveTab={setActiveTab} />
            </RowPrimaryWrapper>
            <RowSecondaryWrapper hOrder={0} vOrder={1}>
              <CardWrapper height={300}>
                <ManageBond />
              </CardWrapper>
            </RowSecondaryWrapper>
          </PageRowWrapper>
          {isBonding() && (
            <>
              <ManagePool />
              <PageRowWrapper className="page-padding" noVerticalSpacer>
                <CardWrapper>
                  <Roles />
                </CardWrapper>
              </PageRowWrapper>
            </>
          )}
        </>
      )}
      {activeTab === 1 && (
        <>
          <PageRowWrapper className="page-padding" noVerticalSpacer>
            <CardWrapper>
              <CardHeaderWrapper>
                <h2>
                  All Pools
                  <OpenAssistantIcon page="pools" title="Nomination Pools" />
                </h2>
              </CardHeaderWrapper>
              <PoolList
                pools={bondedPools}
                title="Active Pools"
                allowMoreCols
                pagination
              />
            </CardWrapper>
          </PageRowWrapper>
        </>
      )}
    </>
  );
};

export default Pools;
