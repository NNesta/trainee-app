import { Types } from "mongoose";
import User from "../models/User";

export const getTraineesQuery = async (
  searchString: string,
  sortBy: string,
  traineesPerPage: number,
) => {
  const trainees = await User.aggregate([
    {
      $match: {
        $or: [{ name: { $regex: new RegExp(searchString, "i") } }],
        role: "TRAINEE",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "coach",
        foreignField: "_id",
        as: "coach",
      },
    },
    {
      $addFields: {
        coach: {
          $cond: {
            if: { $eq: [{ $size: "$coach" }, 0] },
            then: [{}],
            else: "$coach",
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        role: 1,
        coach: {
          $cond: {
            if: { $eq: [{ $size: "$coach" }, 0] },
            then: {},
            else: {
              $arrayElemAt: ["$coach", 0],
            },
          },
        },
      },
    },
    {
      $sort: { [sortBy]: 1 },
    },
    {
      $limit: traineesPerPage,
    },
  ]);
  return trainees;
};

export const getTraineesForCoachQuery = async (
  coachId: Types.ObjectId,
  searchString: string,
  sortBy: string,
  traineesPerPage: number,
) => {
  const trainees = await User.aggregate([
    {
      $match: {
        coach: coachId,
        role: "TRAINEE",
        $or: [{ name: { $regex: new RegExp(searchString, "i") } }],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "coach",
        foreignField: "_id",
        as: "coach",
      },
    },
    {
      $addFields: {
        coach: {
          $cond: {
            if: { $eq: [{ $size: "$coach" }, 0] },
            then: [{}],
            else: "$coach",
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        role: 1,
        coach: {
          $cond: {
            if: { $eq: [{ $size: "$coach" }, 0] },
            then: {},
            else: {
              $arrayElemAt: ["$coach", 0],
            },
          },
        },
      },
    },
    {
      $sort: { [sortBy]: 1 },
    },
    {
      $limit: traineesPerPage,
    },
  ]);
  return trainees;
};
