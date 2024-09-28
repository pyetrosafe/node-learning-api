import { randomUUID } from 'node:crypto';

export class DatabaseMemory {

    #videos = new Map();

    list(search = {}) {

        // Return Array
        return Array.from(this.#videos.entries()).map((arr) => {
            const id = arr[0];
            const data = arr[1];

            return { id, ...data };
        }).filter(video => {
            if (search.id) {
                return video.id == search.id;
            }

            if (search.title) {
                return video.title.includes(search.title);
            }

            return true;
        });

        // Return Iterator
        // return this.#videos.entries();

        // To check values from Iterator or Array:

        // Check if is a Iterator
        // console.log(list[Symbol.iterator]); // [Function: [Symbol.iterator]]
        // console.log(Object.getPrototypeOf(list)); // Object [Map Iterator] {}
        // console.log(typeof list[Symbol.iterator]); // function
        // console.log(typeof Object.getPrototypeOf(list)); // object

        // Count from Iterator or Array
        // let count = typeof list[Symbol.iterator] === 'function' ? Array.from(list).length : list.length;

        // let listString = JSON.stringify(list, (key, value) => (value instanceof Map ? [...value] : value));
    }

    create(video) {
        const uuid = randomUUID();
        this.#videos.set(uuid, video);
        console.log(this.#videos);
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id);
    }

}
