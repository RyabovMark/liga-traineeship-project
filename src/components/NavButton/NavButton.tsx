import './NavButton.css';
import { NavLink } from 'react-router-dom';
import { NavButtonProps } from 'components/NavButton/NavButton.types';

export const NavButton = ({ to, className, onClick, text, state }: NavButtonProps): JSX.Element => {
  const classes = className ? className : '';
  return (
    <NavLink to={to} state={state}>
      <button className={`nav-btn ${classes}`} onClick={onClick}>
        {text}
      </button>
    </NavLink>
  );
};