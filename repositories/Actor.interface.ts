import Actor from "../entities/Actor";

interface ActorRepositoryInterface {

    create(serieId: string, data: Actor): Promise<void>;
    update(serieId: string, id: string, actorModified: Actor): Promise<void>
}

export default ActorRepositoryInterface;