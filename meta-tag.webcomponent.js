class MetaTag extends GHComponent {
    constructor() {
        super();
        this.type = this.getAttribute('type');
        this.og = this.hasAttribute('og') ? true : false;
        this.application = this.hasAttribute('application') ? this.getAttribute('application') : 'pages';
    }

    async render() {
        if(this.environment === 'server') {
            let ids = await super.findIds();
            const app = await gudhub.getApp(ids.appId)
            const items = await gudhub.getItems(ids.appId)
            const item = items.find(findedItem => findedItem.item_id == ids.itemId);
            const fieldId = app.field_list.find(findedField => findedField.name_space === this.type).field_id;
            let value = item.fields.find(findedField => findedField.field_id == fieldId).field_value;
            value = isNaN(value) ? value : await this.getContent(`https://gudhub.com/userdata/${window.constants.chapters[this.application].app_id}/${value}.html`);
            const meta = document.createElement('meta');
            const name = this.og ? 'og:' + this.type : this.type;
            meta.setAttribute('name', name);
            meta.setAttribute('content', value);
            document.querySelector('head').appendChild(meta);
            this.remove();
        }
    }

    getContent(link) {
        return new Promise(async (resolve) => {
            const response = await fetch(link);
            const content = await response.text();
            const div = document.createElement('div');
            div.insertAdjacentHTML('beforeend', content);
            resolve(div.innerText);
        });
    }

}

window.customElements.define('meta-tag', MetaTag);