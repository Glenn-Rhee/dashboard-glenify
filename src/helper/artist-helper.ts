import FormSchema from "@/types/form-schema";

export const VERIFICATION_STATUS =
  FormSchema.filterArtist.shape.verificationStatus.unwrap().options;
export const ACCOUNT_STATUS =
  FormSchema.filterArtist.shape.accountStatus.unwrap().options;
