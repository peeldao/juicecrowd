export type NftFileType =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'video/mp4'
  | 'video/quicktime'
  | 'video/x-m4v'
  | 'video/webm'

export const MP4_FILE_TYPE = 'video/mp4'
export const MOV_FILE_TYPE = 'video/quicktime'
export const WEBM_FILE_TYPE = 'video/webm'
export const M4V_FILE_TYPE = 'video/x-m4v'
export const VIDEO_FILE_TYPES: NftFileType[] = [
  MP4_FILE_TYPE,
  MOV_FILE_TYPE,
  WEBM_FILE_TYPE,
  M4V_FILE_TYPE,
]
