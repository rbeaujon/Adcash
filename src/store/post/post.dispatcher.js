import PostQuery from '../../query/post.query';

/** @namespace  Adcash/Store/Post/Post/Container */
export class postDispatcher {
    async getPost() {
        return PostQuery();
    }
}

export default new postDispatcher();