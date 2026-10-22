import React, { useEffect, useRef, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

interface UserList {
  users: User[];
  onSelectUser: (id: number) => void;
  activeUser: number | null;
}

export const UserSelector: React.FC<UserList> = ({
  users,
  onSelectUser,
  activeUser,
}) => {
  const [triggerDrowpdown, setTriggerDrowpdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setTriggerDrowpdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleClick = (id: number) => {
    onSelectUser(id);
    setTriggerDrowpdown(false);
  };

  const selectedUser = users.find(user => user.id === activeUser);

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', [triggerDrowpdown && 'is-active'])}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setTriggerDrowpdown(true)}
        >
          <span>
            {activeUser === null
              ? 'Choose a user'
              : selectedUser && selectedUser.name}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              href={`#user-${user.id}`}
              className={classNames(
                'dropdown-item',
                activeUser === user.id && ['is-active'],
              )}
              key={user.id}
              onClick={() => handleClick(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
