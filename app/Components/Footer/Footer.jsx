import './footer_style.scss';

const Footer = () => {
  return (
    <footer>
        <div>
            <h4>Dear Diary</h4>
            <p>&copy;2024 Dear Diary. All rights reserved.</p>
            <p>Designed by Dear Diary team</p>
        </div>
        <div>
            <h4>CATAGORIES</h4>
            <ul>
                <li><a href="#">Technology</a></li>
                <li><a href="#">Lifestyle</a></li>
                <li><a href="#">Health & Fitness</a></li>
            </ul>
            <ul>
                <li><a href="#">Travel</a></li>
                <li><a href="#">Fashion</a></li>
                <li><a href="#">Sports</a></li>
            </ul>
        </div>
        <div>
            <h4>SUBSCRIBE</h4>
            <form action=""><input type="email" name="" id="" placeholder='Enter your email'/></form>
        </div>
    </footer>
  )
}

export default Footer
