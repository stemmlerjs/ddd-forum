"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memberMap_1 = require("../../mappers/memberMap");
const memberDetailsMap_1 = require("../../mappers/memberDetailsMap");
const memberIdMap_1 = require("../../mappers/memberIdMap");
class MemberRepo {
    constructor(models) {
        this.models = models;
    }
    createBaseQuery() {
        const models = this.models;
        return {
            where: {},
            include: [
                { model: models.BaseUser, as: 'BaseUser' }
            ]
        };
    }
    async exists(userId) {
        const MemberModel = this.models.Member;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_base_id'] = userId;
        const member = await MemberModel.findOne(baseQuery);
        const found = !!member === true;
        return found;
    }
    async getMemberIdByUserId(userId) {
        const MemberModel = this.models.Member;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_base_id'] = userId;
        const member = await MemberModel.findOne(baseQuery);
        const found = !!member === true;
        if (!found)
            throw new Error('Member id not found');
        return memberIdMap_1.MemberIdMap.toDomain(member);
    }
    async getMemberByUserId(userId) {
        const MemberModel = this.models.Member;
        const baseQuery = this.createBaseQuery();
        baseQuery.where['member_base_id'] = userId;
        const member = await MemberModel.findOne(baseQuery);
        const found = !!member === true;
        if (!found)
            throw new Error("Member not found");
        return memberMap_1.MemberMap.toDomain(member);
    }
    async getMemberByUserName(username) {
        const MemberModel = this.models.Member;
        const baseQuery = this.createBaseQuery();
        baseQuery.include[0].where = {
            username: username
        };
        const member = await MemberModel.findOne(baseQuery);
        const found = !!member === true;
        if (!found)
            throw new Error("Member not found");
        return memberMap_1.MemberMap.toDomain(member);
    }
    async getMemberDetailsByUserName(username) {
        const MemberModel = this.models.Member;
        const baseQuery = this.createBaseQuery();
        baseQuery.include[0].where = {
            username: username
        };
        const member = await MemberModel.findOne(baseQuery);
        const found = !!member === true;
        if (!found)
            throw new Error("Member not found");
        return memberDetailsMap_1.MemberDetailsMap.toDomain(member);
    }
    async save(member) {
        const MemberModel = this.models.Member;
        const exists = await this.exists(member.userId.id.toString());
        if (!exists) {
            const rawSequelizeMember = await memberMap_1.MemberMap.toPersistence(member);
            await MemberModel.create(rawSequelizeMember);
        }
        return;
    }
}
exports.MemberRepo = MemberRepo;
//# sourceMappingURL=sequelizeMemberRepo.js.map