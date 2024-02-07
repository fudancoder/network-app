// Copyright 2020-2022 SubQuery Pte Ltd authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { STABLE_TOKEN, TOKEN } from '@utils/constants';

const translation = {
  consumer: 'Consumer',
  plans: {
    category: {
      serviceAgreement: 'Service Agreements',
      myPlan: 'My Plans',
      manageMyPlans: 'Manage My Plans',
      myOffers: 'My Offers',
      offerMarketplace: 'Offer Marketplace',
      myFlexPlans: 'My Flex Plans',
    },
    default: {
      title: 'You can create a maximum of 5 default plans for each project deployment',
      createPlans: `Create plans for projects you're indexing. <br> Learn how to create a plan <1>here</1>.`,
      query: '{{count}} query',
      query_other: '{{count}} queries',
      requestPerMin: 'requests/sec',
    },
    specific: {
      title: 'You can create a maximum of 5 specific plans for each project deployment',
      nonPlans:
        'You are not indexing any deployments to have specific plan.<br> Learn how to create a specific plan <1>here</1>.',
      nonDeployment: 'You have no plans specific to this deployment',
    },
    headers: {
      id: 'Id',
      price: 'Price',
      period: 'Period',
      dailyReqCap: 'Daily Request Cap',
      rateLimit: 'Rate Limit',
      priceToken: 'Token',
      action: 'Action',
      deploymentId: 'Deployment Id',
      toUSDC: 'To USDC Price',
      paymentAmount: 'Paymeny Amount',
      paymentTips: 'This rate may vary at the time of payment',
    },
    create: {
      action: 'Create',
      title: 'Create a Plan',
      step1: 'Set parameters',
      description: 'Template',
      failureText: 'Failed to create plan',
      priceTitle: 'Set a price for this plan',
      cancel: 'Cancel',
      submit: 'Create',
    },
    remove: {
      action: 'Remove',
      title: 'Are you sure you want to remove this plan?',
      description: 'Plan Details',
      failureText: 'Failed to remove plan',
      submit: 'Confirm Removal',
      cancel: 'Not now',
    },
    purchase: {
      action: 'purchase',
      title: 'Purchase Plan',
      step1: 'Confirm details',
      description: 'Plan Details',
      failureText: 'Failed to purchase plan',
      submit: 'Purchase',
      cancel: 'Cancel',
      yourBalance: 'Your balance ',
      failToLoadBalance: 'Failed to load balance.',
      noPlansForPurchase: 'There is no plan available to purchase.',
      failureFetchPlans: 'Failed to get plans for indexer',
      notReadyToBePurchased: `This plan cannot be purchased until the Indexer status is 'Ready'`,
    },
    inactiveTemplate: 'This template has mark as inactive.',
    inactiveTemplateTip: 'This template has mark as inactive, please delete it.',
  },
  flexPlans: {
    project: 'project',
    indexer: 'indexer',
    validityPeriod: 'Validity Period',
    spent: 'spent',
    channelStatus: 'Channel Status',
    duration: 'duration',
    remainDeposit: 'remaining deposit',
    request: '{{count}} request',
    request_other: '{{count}} requests',
    billBalance: 'Billing Balance',
    billingAccount: 'The balance of your billing account is {{amount}}',
    billingAccountTooltip: `When you purchase a flex plan, you need to transfer ${TOKEN} to your billing account from your wallet. The funds are kept in your billing account to allow you to purchase multiple flex plans using the same funds. To view, transfer or withdraw from your billing account, please visit the My Flex Plan page under the Consumer heading.`,
    walletBalance: 'WALLET BALANCE',
    non: 'There are no flex plan list. ',
    purchaseModal: 'Purchase Flex Plan',
    expectQueryPeriod: 'Expected query period',
    expectQueryPeriodTooltip:
      'The number of days that you expect to query, the value needs to be less than the Validity Period.',
    invalidQueryPeriod: 'Please input a valid query period.',
    depositAmount: 'Amount to deposit',
    depositAmountTooltip:
      'This amount will go towards your flex plan, to avoid affecting query performance, please ensure you have sufficient funds.',
    invalidDepositAmount: 'Please input a valid deposit.',
    purchase: 'Purchase',
    purchased: 'Purchased',
    confirmPurchase: 'Confirm Purchase',
    disabledPurchaseAsOffline: 'Indexer is offline.',
    successPurchaseTitle: 'Success',
    successPurchaseDesc: 'You have successfully purchased the plan!',
    own: 'Created by you',
    flexPlan: 'Flex Plan',
    flexPlanDesc:
      'For provide a better experience, Subquery will pick the optimal indexer for your Flex Plan based on a combination of price and historical performance.',
    deposit: 'Deposit',
    createFlexPlan: 'Create Flex Plan',
  },
  myFlexPlans: {
    description:
      'Flex Plans are advertised by Indexers on each SubQuery Project in the Explorer. View and terminate your purchased Flex Plans here.',
    ongoing: 'Ongoing',
    closed: 'Closed',
    apiKey: 'API Key',
    playground: 'Playground',
    error: 'Fetch playground wrong',
    billing: {
      transfer: `Transfer ${TOKEN ?? 'SQT'} to billing account`,
      addToken: `Add ${TOKEN ?? 'SQT'}`,
      confirmTransfer: 'Confirm Transfer',
      transferDescription: `When transferring ${TOKEN} you are also authorising SubQuery to perform some automated tasks on your behalf. For example:  topping up your Flex Plans that are running low on funds or terminating a channel if the Indexer requests it to be closed. This automation will prevent delays and give you the best user experience.`,
      transferToken: `Transfer ${TOKEN ?? 'SQT'}`,
      failureTransfer: `Sorry, failed to transfer ${TOKEN ?? 'SQT'}`,
      successTransfer: `You have successfully transferred ${TOKEN ?? 'SQT'}`,
      notEnoughToken: `You don't have enough ${TOKEN} in your wallet.`,
      withdrawTitle: `Withdraw ${TOKEN ?? 'SQT'} to wallet`,
      withdraw: `Withdraw ${TOKEN ?? 'SQT'} to wallet`,
      withdrawToken: `Withdraw ${TOKEN ?? 'SQT'}`,
      confirmWithdraw: 'Confirm withdraw',
      failureWithdraw: `Sorry, failed to withdraw ${TOKEN ?? 'SQT'}`,
      successWithdraw: `You have successfully withdrawn ${TOKEN ?? 'SQT'}`,
    },
    claim: {
      title: 'Claim remaining deposit',
      description: 'You are about to claim {{remainDeposit}} {{token}} from the flex plan',
      button: 'Claim',
      submit: 'Confirm claim',
      failureText: 'Sorry, failed to claim flex plan',
      claimed: 'Claimed',
    },
    terminate: {
      title: 'Terminate',
      terminatePlan: 'Terminate this plan',
      terminateDesc: `Are you sure you want to terminate this plan? Once you confirm, the query endpoint will be deactivated and you will be able to claim back the remaining deposit to your billing account. `,
      remainDeposit: 'Remaining deposit',
      failure: 'Failed to terminate this plan.',
    },
  },
  serviceAgreements: {
    headers: {
      project: 'Project',
      deployment: 'Version - Deployment ID',
      consumer: 'Consumer',
      indexer: 'Indexer',
      expiry: 'Expires In',
      expired: 'Expiry Date',
      price: 'Price',
      startDate: 'Start Date',
    },
    playground: {
      title: 'Playground',
      requireSessionToken: 'You need a session token to start querying on playground.',
      requestToken: 'Request token',
      ongoingAgreements: 'My Ongoing Service Agreements',
      sessionToken: 'Session Token',
      tokenExpireIn: 'Token expires in',
      comingSoon: 'Playground coming soon.',
      error: 'There is an issue with playground, please check with indexer.',
      queryTitle: 'Playground Query',
      expiredToken: 'The auth token for playground query has expired.',
    },
    noAgreementsTitle: 'You don’t have any service agreements yet',
    non: 'There are no service agreements for this project yet.',
    noOngoingAgreementsTitle: 'There are no ongoing service agreements.',
    nonOngoingAgreements:
      'Ongoing service agreements will be displayed here along with the details of the plan or offer purchased by the Indexer. When an agreement has expired, it will automatically move to the Expired list. If there are currently no ongoing service agreements, this page will reflect that. ',
    learnLink: 'Learn more ',
    nonOngoing: 'You don’t have any ongoing service agreement yet. <br> Learn more from <1>here</1>.',
    nonExpired: 'You don’t have any expired service agreement yet. <br> Learn more from <1>here</1>.',
    agreementsDescription: `Agreements represent an agreement between only one Indexer and one Consumer. It’s a direct relationship where all payment flows between the two parties for the work that is done.`,
    nonConsumerAgreementsDescription_0:
      'If you (as a Consumer) create an offer that is accepted by an Indexer OR you (as a Consumer) purchase a plan advertised by an Indexer in the Explorer, a service agreement will be generated which can be tracked here.',
    nonConsumerAgreementsDescription_1:
      'If you haven’t created any offers to attract an Indexer yet, you can create your first one under My Offers',
    nonConsumerAgreementsInfoLink: 'Learn more <1>here</1>',
    nonIndexerAgreementsDescription_0:
      'Once a Consumer purchases your advertised plan OR you accept a Consumer’s offer, it will generate a service agreement which you can track here.',
    nonIndexerAgreementsDescription_1:
      'You can create and view your plans under My Plans, or browse the offers made by consumers under ‘Offer Marketplace',
    nonIndexerAgreementsInfoLink: 'Learn more <1>here</1>',
    faliedToFetchServiceAgreement: 'Failed to request token for service agreement.',
  },
  myOffers: {
    inactiveOffer: 'This template has mark as inactive, please cancel it.',
    title: 'My Offers',
    open: 'Open',
    openTooltip: 'Offers that are still open to Indexers to accept',
    closed: 'Closed',
    closedTooltip: 'Offers that have reached the Indexer cap and can no longer be accepted',
    closedDescription: 'Here you can find the offers that have reached Indexer cap',
    expired: 'Expired',
    expiredDescription:
      'Here you can find the expired offers which did not reach the required number of indexers. \n  You can withdraw your unspent balance from these offers.',
    expiredUnspent: 'You can withdraw your unspent balance from these offers.',
    expiredTooltip:
      'You can find offers that have expired or cancelled without reaching the Indexer cap. You can withdraw any unspent balance here',
    createOffer: 'Create an Offer',
    noOffersTitle: "You haven't created any offers yet",
    noOffersDesc_1:
      'As a consumer, you can create your own offer that will be published to the Offer Marketplace for Indexers to accept.',
    noOffersDesc_2:
      'Once accepted, a service agreement will be generated and the Indexer will begin indexing the requested data for you',
    noOffersInfoLink: 'Learn how to create an offer <1>here</1>',
    non: 'There is no offers available.',
    table: {
      versionDeployment: 'Version - Deployment ID',
      indexerAmount: 'No. of indexers',
      accepted: 'Accepted',
      acceptedTooltip: 'This is the number of Indexers that have already accepted this offer',
      cap: 'Cap',
      capTooltip: 'This is the maximum number of Indexers that can accept this offer',
      dailyRewardsPerIndexer: 'Daily Rewards Per indexer',
      dailyRewardsPerIndexerTooltip: 'This is the daily amount a Indexer will receive from accepting the offer',
      totalRewardsPerIndexer: 'Total Rewards per indexer',
      totalRewardsPerIndexerTooltip:
        'This is the total amount an Indexer will receive from accepting the offer. This amount is calculated as the daily rewards per Indexer multiplied by the period.',
      depositAmount: 'Total deposit',
      period: 'Period',
      periodTooltip: 'This is the duration the Indexer who has accepted this offer will be receiving their rewards for',
      minIndexedHeight: 'min indexed height',
      minIndexedHeightTooltip: 'Only Indexers that have indexed to this block height or above can accept this offer',
      expired: 'Expire',
      unspendBalance: 'Unspent balance',
      amount: 'Amount',
      totalOpenOffer: 'You have {{count}} open offer',
      totalOpenOffer_other: 'You have {{count}} open offers',
    },
    steps: {
      step_0: 'Choose Deployment ID',
      step_1: 'Choose Template',
      step_2: 'Set Details',
      step_3: 'Confirm',
    },
    step_0: {
      title: 'Step 1: Find the SubQuery Project Deployment ID for this offer',
      description:
        'You can copy & paste the deployment ID of your desired project by entering their project detail page from  <1>explorer<1>.',
      search: 'Search deployment ID',
      selectedId: 'Selected ID',
    },
    step_1: {
      title: 'Step 2: Choose an offer template from below',
    },
    step_2: {
      title: 'Step 3: Set the details for your offer',
      rewardPerIndexer: 'Total rewards per indexer',
      rewardPerIndexerTooltip: 'This is the total amount a Indexer will receive from accepting the offer.',
      rewardPerIndexerErrorMsg: 'Please put a valid reward for an indexer.',
      indexerCap: 'Indexer cap',
      indexerCapWithCount_one: '{{count}} Indexer',
      indexerCapWithCount_other: '{{count}} Indexers',
      indexerCapTooltip: 'This is the maximum number of Indexers that can accept this offers',
      indexerCapErrorMsg: 'Please put a valid Indexer cap.',
      totalDeposit: 'Required deposit',
      totalDepositTooltip: `This amount is calculated as the rewards per Indexer multiplied by the Indexer cap that you have stated above. \n
      You will need to deposit this amount when you confirm the creation of this offer on MetaMask. Any unspent balance can be withdrawn when the offer expires or if you cancel the offer prior to expiration`,
      totalDepositErrorMsg: 'Not enough balance. Lower the numbers set up above or deposit more to the wallet.',
      minimumIndexedHeight: 'Minimum indexed height',
      minimumIndexedHeightTooltip:
        'Only Indexers that have indexed to this block height or above can accept this offer.',
      minimumIndexedHeightErrorMsg: 'Please put a valid block height.',
      expireDate: 'Expiration time',
      expireDateTooltip:
        'Indexer cannot accept this offer after the expiration time. However, the Indexer that have already accepted the offer will not be affected.',
      cancelWarning:
        'Cancelling an offer before it expires will result in 10% of the unspent balance being charged as a cancellation fee.',
    },
    step_3: {
      title: 'Step 4: Confirm offer summary',
      consumer: 'Consumer',
      deploymentId: 'Deployment ID',
      offerTemplate: 'Offer Template',
      detailSettings: 'Detail settings',
    },
    cancel: {
      title: 'Cancel this offer',
      description:
        'By cancelling this open offer, you will be able to withdraw the unspent balance. Cancellation fee will be applied and be deducted from the unspent balance.',
      failureText: 'Sorry, failed to cancel offer',
      cancelFee: 'Cancellation fee',
      unSpent: 'Unspent balance',
      youWillReceive: 'You will receive',
    },
    withdraw: {
      title: 'withdraw',
      modalTitle: 'Withdraw from the offer',
      description: `You are about to withdraw {{bigNumAmount}} ${TOKEN} from this offer to your wallet`,
      failureText: 'Sorry, failed to withdraw offer',
    },
  },
  offerMarket: {
    header: 'Offer Marketplace',
    listDescription: 'A list of all offers published by Consumers that are available to be accepted by Indexers',
    noOffersTitle: 'There are no offers here yet',
    indexerNoOffers:
      'As a Indexer, once there are offers avaliable you will be able to accept them here. After this you can start indexing the project. Learn more about the role of an Indexer <1>here</1>',
    consumerNoOffers:
      'As a Consumer, you can go to My Offers to create your own offer which will be published on the Offer Marketplace. Indexers will accept your offer to create a service agreement and begin indexing the data for you.',
    viewAsIndexer: 'If you are an indexer, here is where you can explore and accept offers. ',
    totalOffer: 'Total {{count}} offer',
    totalOffer_other: 'Total {{count}} offers',
    accept: 'Accept',
    searchByDeploymentId: 'Search by deployment Id',
    alreadyAcceptedOffer: 'You have already accepted this offer',
    offerInactive: 'This offer has mark as inactive',
    acceptModal: {
      nonCriteriaData: 'There is no criteria data available',
      moveFromSummary: 'Move to the next step to check you meet the criteria for this offer.',
      title: 'Accept the offer',
      check: 'Check criteria',
      offerSummary: 'Offer summary',
      consumer: 'Consumer',
      passCriteria: 'You have passed {{count}} criteria',
      criteria: 'Criteria',
      yourProject: 'Your Project',
      indexingStatus: 'Indexing progress',
      indexingStatusError: 'Your project needs to be 100% indexed.',
      projectStatus: 'Project status',
      projectStatusError: 'You can announce ‘Ready’ for the project from the Indexer admin app.',
      blockHeight: 'Block height',
      blockHeightError: 'Your project is currently behind the minimum blockheight.',
      dailyRewards: 'Daily Rewards',
      dailyRewardsError: `Please stake more ${TOKEN} or get more delegation to increase daily reward capacity.`,
      failureText: 'Failed to accept offer',
      afterAcceptOffer:
        'By accepting the offer, a service agreement will be created between you and the Consumer after you confirm on MetaMask.',
    },
  },
} as const;

export default translation;
