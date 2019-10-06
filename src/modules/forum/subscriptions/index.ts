
import { createMember } from "../useCases/members/createMember";
import { AfterUserCreated } from "./afterUserCreated";

// Subscriptions
new AfterUserCreated(createMember);
