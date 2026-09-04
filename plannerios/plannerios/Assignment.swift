//
//  Assignment.swift
//  plannerios
//
//  Created by Nathan Wiebe on 9/4/26.
//

import SwiftUI


struct Assignment: View{
    let name: String
    let course: String
    let isComplete: Bool = false
    
    var body: some View{
        HStack{
            Image(systemName: "folder.circle")
                .font(.largeTitle)
                .frame(width: 50)
            VStack{
                Text("\(name)")
                    .font(.title)
                Text("\(course)")
            }
            Spacer()
            Image(systemName: isComplete ? "checkmark.circle.fill" : "checkmark.circle")
                .font(.largeTitle)
        }
        .foregroundStyle(Color.white)
        
        .padding()
        .background{
            RoundedRectangle(cornerRadius: 12)
                .foregroundStyle(.tint)
                .opacity(0.25)
                .brightness(-0.4)
        }

        .padding()
    }
}
#Preview {
    Assignment(name: "Assignment 1", course: "Computer Architecture")
}
