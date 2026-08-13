interface IModalListItem {
    badge: string;
    title: string;
    description: string;
}

export const ModalListItem = ({badge, title, description}: IModalListItem) => {
    return (
        <li className="item">
            <p className="item--badge">{badge}</p>
            <p className="item--title">{title}</p>
            <p className="item--description">{description}</p>
        </li>
    );
};
