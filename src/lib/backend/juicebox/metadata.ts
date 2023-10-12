import { ipfsGatewayUrl } from '@/lib/ipfs'
import axios from 'axios'
import {
  JBProjectMetadata,
  jbProjectsABI,
  jbProjectsAddress,
} from 'juice-hooks'
import { getContract } from 'viem'
import { CHAIN_ID } from '../config'
import { publicClient } from '../../viem/publicClient'

const PROJECT_METADATA_DOMAIN = 0n

export const getProjectMetadata = async (projectId: bigint) => {
  const metadataCid = await getMetadataCidFromContract(BigInt(projectId))
  const res = await axios.get<JBProjectMetadata>(ipfsGatewayUrl(metadataCid))
  return res.data
}

async function loadJBProjects() {
  const contract = getContract({
    address: jbProjectsAddress[CHAIN_ID],
    abi: jbProjectsABI,
    publicClient,
  })
  return contract
}

const getMetadataCidFromContract = async (projectId: bigint) => {
  const JBProjects = await loadJBProjects()

  const metadataCid = (await JBProjects.read.metadataContentOf([
    projectId,
    PROJECT_METADATA_DOMAIN,
  ])) as string

  return metadataCid
}
