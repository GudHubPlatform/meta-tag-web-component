class MetaTag extends GHComponent {
    constructor() {
        super();
    }
    
    async onServerRender() {
        this.type = this.getAttribute('type');
        this.og = this.hasAttribute('og') ? true : false;
        this.twitter = this.hasAttribute('twitter') ? true : false;
        this.twitterName = this.hasAttribute('data-twitter-name') ? this.getAttribute('data-twitter-name') : false;
        const chapter = this.hasAttribute('data-chapter') ? this.getAttribute('data-chapter') : 'pages';
        let ids = await super.findIds(chapter);
        await this.addTag(ids.appId, ids.itemId);
    }
    async addTag (appId, itemId) {
        const app = await gudhub.getApp(appId);
        const items = app.items_list;
        const item = items.find(findedItem => findedItem.item_id == itemId);
        const fieldId = app.field_list.find(findedField => findedField.name_space === this.type).field_id;
        let value = item.fields.find(findedField => findedField.field_id == fieldId).field_value;
        value = isNaN(value) ? value : await this.getContent(`https://gudhub.com/userdata/${window.constants.chapters[this.application].app_id}/${value}.html`);
        
        if (this.og) {
            const meta = document.createElement('meta');
            const name = 'og:' + this.type;
            meta.setAttribute('property', name);
            meta.setAttribute('content', value);
            document.querySelector('head').prepend(meta);
            if (this.type == 'title') {
                const metaSiteName = document.createElement('meta');
                const name = 'og:site_name';
                metaSiteName.setAttribute('property', name);
                metaSiteName.setAttribute('content', value);
                document.querySelector('head').prepend(metaSiteName);
            }
        } else if (this.twitter) {
            const meta = document.createElement('meta');
            const name = 'twitter:' + this.type;
            meta.setAttribute('name', name);
            meta.setAttribute('content', value);

            if (this.type == 'title') {
                const metaCard = document.createElement('meta');
                metaCard.setAttribute('name', 'twitter:card');
                metaCard.setAttribute('content', 'summary_large_image');
                
                document.querySelector('head').prepend(metaCard);
            
                const metaSite = document.createElement('meta');
                metaSite.setAttribute('name', 'twitter:site');
                metaSite.setAttribute('content', this.twitterName);

                document.querySelector('head').prepend(metaSite);
            }

            document.querySelector('head').prepend(meta);
        } else {
            const meta = document.createElement('meta');
            const name = this.type;
            meta.setAttribute('name', name);
            meta.setAttribute('content', value);
            document.querySelector('head').prepend(meta);
        }
        if (!document.querySelector('[property="og:type"]')) {
            const metaWebsite = document.createElement('meta');
            metaWebsite.setAttribute('property', 'og:type');
            metaWebsite.setAttribute('content', 'webiste');
            document.querySelector('head').prepend(metaWebsite);
        }
        
        if (!document.querySelector('[property="og:locale"]')) {
            const metaLocale = document.createElement('meta');
            metaLocale.setAttribute('property', 'og:locale');
            metaLocale.setAttribute('content', 'en');
            document.querySelector('head').prepend(metaLocale);
        }

        this.remove();
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