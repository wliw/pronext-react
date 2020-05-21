import templateEjs from './template.ejs';

export default function render ({
    title = 'React',
    keywords = 'react',
    description = 'react',
    templates = []
}) {
    let contents = templates.map(template => template());

    return templateEjs({
        title,
        keywords,
        description,
        contents,
        debug: process.env.NODE_ENV === 'test'
    });
}

