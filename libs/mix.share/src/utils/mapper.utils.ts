import { MixPostPortalModel, MixPostReferenceModel } from '@mix/mix.lib';

export class Mapper {
  public static PostToPostReference(
    post: MixPostPortalModel
  ): MixPostReferenceModel {
    return <MixPostReferenceModel>{};
  }
}
