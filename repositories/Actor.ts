import Actor from "../entities/Actor";
import ActorRepositoryInterface from "./Actor.interface";

class ActorRepository implements ActorRepositoryInterface {

    constructor(
        private readonly actor: Actor,
    ) {}

    async create(serieId: string, data: Actor): Promise<void> {
        this.actor.name = data.name;
        this.actor.image = data.image;
        this.actor.serieId = serieId;

        await this.actor.create()
    }
    
    async update(serieId: string, id: string, actorModified: Actor): Promise<void> {
        this.actor.name = actorModified.name;
        this.actor.image = actorModified.image;
        this.actor.serieId = serieId;

        await this.actor.update(`Actor#${id}`, actorModified)
    }

}

export default ActorRepository;