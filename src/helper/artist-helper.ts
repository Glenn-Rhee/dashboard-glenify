import FormSchema from "@/types/form-schema";

export const VERIFICATION_STATUS =
  FormSchema.filterArtist.shape.verificationStatus.unwrap().options;
export const ACCOUNT_STATUS =
  FormSchema.filterArtist.shape.accountStatus.unwrap().options;
export const GENRE_ARTIST =
  FormSchema.filterReqArtist.shape.genre.unwrap().options;
export const STATUS_APPROVAL_ARTIST =
  FormSchema.filterReqArtist.shape.status.unwrap().options;
