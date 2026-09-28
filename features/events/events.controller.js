import { insertEventSchema, updateEventSchema } from "./events.schema.js";
import {
  commonCreateService,
  commonGetService,
  commonGetSingleService,
  commonUpdateService,
  commonDeleteService,
} from "#/common/feature/common.services.js";
import { StatusCodes } from "http-status-codes";
import { events } from "#/db/schema/events.js";

export async function createEventController(req, res) {
  const { data } = insertEventSchema.safeParse(req.body);

  const result = await commonCreateService(events, data);

  res.status(StatusCodes.CREATED).json({
    success: true,
    event: result,
  });
}

export async function getEventsController(req, res) {
  const result = await commonGetService(events);

  res.status(StatusCodes.OK).json({
    success: true,
    items: result,
    resource: "all events",
  });
}

export async function getSingleEventController(req, res) {
  const result = await commonGetSingleService(events, req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    item: result,
    resource: "single event",
  });
}

export async function updateEventController(req, res) {
  const data = updateEventSchema.parse(req.body);
  const result = await commonUpdateService(events, req.params.id, data);

  res.status(StatusCodes.OK).json({
    success: true,
    event: result,
  });
}

export async function deleteEventController(req, res) {
  const result = await commonDeleteService(events, req.params.id);

  res.status(StatusCodes.OK).json({
    success: true,
    event: result,
  });
}
