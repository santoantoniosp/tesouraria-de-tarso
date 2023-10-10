import { TransactionType } from "./transaction";

export type Category = {
  id: string;
  communityId: string;
  name: string;
  icon: string;
  type: TransactionType;
}
